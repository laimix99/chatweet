import { defineStore } from 'pinia';
import { useStorage } from '@vueuse/core';

export const useStoreMain = defineStore('counter', () => {
  const api = useStoreApi()

  const state = reactive({
    user: {},
    posts: [],
    myPost: [],
    comments: [],
    showModal: false,
    showEdit: false,
    showSeach: false,
    showRegistration: true,
    menu: [
      {title: 'Лента', link: '/', icon: 'ribbon'},
      {title: 'Профиль', link: '/profile', icon: 'profile'},
      {title: 'Поиск', link: '/search', icon: 'search'},
    ],

  }) as any
  async function getUser() {
    const path = '/users/me';
    const options = {
      method: 'get',
      query: {
      },
    };
    const { data } = await api.ftch(path, options);
    // console.log(':getUsers', data);
    state.user = data;
  }

  async function getFeedUser(id: any) {
    const { data } = await api.ftch(`/users/${id}/`,{
      method: 'get',
      query: {
        fields: ['*.*']
      }
    })
    // console.log('getFeedUser', data)
    state.feedUser = data
  }

  async function postUser(user: any) {
    await api.ftch('/users', {
      method: 'post',
      body: {
        first_name: user.first_name,
        email: user.email,
        password: user.password,
        role: 'def3d196-9248-4195-a724-9a2745e3cead',
        last_name: user.last_name
      },
    })
    // console.log("postUser")
  }

  async function editUsers(id: string, prof: any) {
    const path = `/users/${id}`
    const options = {
      method: 'PATCH',
      body: {
        first_name: prof.name,
        location: prof.location,
        description: prof.description,
        avatar: prof.avatar
      }
    }
    getUser()
  }

  async function getPost() {
    const { data } = await api.ftch('/items/posts', {
      method: 'get',
      query: {
        fields: ['*.*'],
        filter: {
          parent: { _null: true },
          status: 'published'
        },
        limit: -1,
        sort: ['-date_created'],
      },
    });
    
    // console.log('getPost', data);
    state.posts = data;
  }

  async function postFollowing(user_id: any) {
    await api.ftch('/items/follows/', {
      method: 'post',
      body: {
        user: state.user.id,
        follower: user_id
      }
    })
    // console.log(':postFollowing')
  }

  async function getMyPosts(id: any) {
    const { data } = await api.ftch('/items/posts', {
      method: 'get',
      query: {
        fields: ['*.*'],
        filter: {
          parent: { _null: true },
          user_created: { _eq: id },
          status: 'published'
        },
        limit: -1,
        sort: ['-date_created'],
      }
    })
    state.myPost = data
    // console.log("getMyPosts", data)
  }

  async function postPost(post: any) {
    await api.ftch('/items/posts', {
      method: 'post',
      body: {
        description: post.description,
        images: post.images,
        status: 'published',
      },
    });
    getPost();
  }

  async function deletePost(id: string, parent_id: string) {
    if (confirm('Удалить пост ?')) {
      await api.ftch(`items/posts/${id}`, {
        method: 'PATCH',
        body: {
          status: 'archived'
        }
      })
    }
    getPost()
    getSelectedComment(parent_id)
  }

  async function getComment(id: any) {
    const { data } = await api.ftch('/items/posts', {
      method: 'get',
      query: {
        fields: ['*.*'],
        filter: {
          parent: {_eq: id}
        },
        limit: -1,
      }
    })
    // console.log('getComment', data)
    const indexPost = state.posts.findIndex((post: any) => post.id === id)
    if(indexPost >= 0) {
      state.posts[indexPost].children = data
    }
  }

  async function getSelectedComment(id: any) {
    const { data } = await api.ftch('/items/posts', {
      method: 'get',
      query: {
        fields: ['*.*'],
        filter: {
          parent: {_eq: id},
          status: 'published'
        },
      }
    })
    // console.log('getComment', data)
    state.comments = data
  }

  async function postComment(comment: any) {
    await api.ftch('/items/posts', {
      method: 'post',
      body: {
        description: comment.description,
        parent: comment.parent,
        status: 'published',
      }
    })
    getComment(comment.parent);
    // console.log(':postComment', comment.parent)
  }
  
  async function login(user: any) {
    try {
      console.log(':login')
      const { data } = await api.ftch('/auth/login', {
        method: 'post',
        body: {
          email: user.email,
          password: user.password,
        },
        credentials: 'include',
      })
      // console.log(':login data', data)
      api.saveTokens(data)
    }
    catch (e: any) {
      console.log(':login error', e)
      api.removeTokens()
    }
  }

  async function logout() {
    try {
      console.log(':logout start')
      const { data } = await api.ftch('/auth/logout', {
        method: 'post',
        body: {
          refresh_token: api.refreshToken,
        },
      })
      // console.log(':logout data', data)
      api.removeTokens()
    }
    catch (e: any) {
      console.log(':logout error', e)
      api.removeTokens()
    }
  }


  return {
    state,

    editUsers,
    deletePost,
    postPost,
    getPost,
    getUser,
    getComment,
    postComment,
    postUser,
    login,
    logout,
    getSelectedComment,
    getFeedUser,
    getMyPosts,
    postFollowing,
  };
});
