import { defineStore } from 'pinia';
import { useStorage } from '@vueuse/core';

export const useStoreMain = defineStore('counter', () => {
  const api = useStoreApi()

  const state = reactive({
    user: {},
    posts: [],
    myPost: [],
    showModal: false,
    showEdit: false,
    showRegistration: true,
    menu: [
      {title: 'Лента', link: '/', icon: 'ribbon'},
      {title: 'Профиль', link: '/profile', icon: 'profile'},
      // {title: 'Авторизация', link: '/auth', icon: 'profile'},
    ],

  })

  async function getUser() {
    const path = '/users/me';
    const options = {
      method: 'get',
      query: {
        // fields: ['*.*'],
      },
    };
    const { data } = await api.ftch(path, options);
    console.log(':getUsers', data);
    state.user = data;
  }

  async function postUser(user: any) {
    await api.ftch('/users', {
      method: 'post',
      body: {
        first_name: user.first_name,
        email: user.email,
        password: user.password,
        role: 'def3d196-9248-4195-a724-9a2745e3cead',
      },
    })
    console.log("postUser")
  }

  // async function editUsers(id: string, prof: any) {
  //   const path = `/users/${id}`
  //   const options = {
  //     method: 'patch',
  //     mode: 'no-cors',
  //     body: {
  //       first_name: prof.name,
  //       last_name: prof.username,
  //       location: prof.location,
  //       description: prof.description
  //     }
  //   }
  //   const { data } = await api.ftch(path, options)
  //   users.value = data
  // }

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
    
    console.log('getPost', data);
    state.posts = data;
  }

  async function getMyPosts(id: any) {
    const { data } = await api.ftch('/items/posts', {
      method: 'get',
      query: {
        fields: ['*.*'],
        filter: {
          user_created: { _eq: id },
          status: 'published'
        },
        limit: -1,
        sort: ['-date_created'],
      }
    })
    state.myPost = data
    console.log("getMyPosts", data)
    // getUser()
  }

  async function postPost(post: any) {
    await api.ftch('/items/posts', {
      method: 'post',
      body: {
        description: post.description,
        status: 'published',
      },
    });
    getPost();
  }

  async function deletePost(id: string) {
    if (confirm('Удалить пост ?')) {
      await api.ftch(`items/posts/${id}`, {
        method: 'delete'
      })
    }
    // getPost()
    getMyPosts(id)
  }
  async function getComment(id: any) {
    const { data } = await api.ftch('/items/posts', {
      method: 'get',
      query: {
        fields: ['*.*'],
        filter: {
          parent: {_eq: id}
        },
        // sort: ['-date_created'],
        limit: -1,
      }
    })
    console.log('getComment', data)
    const indexPost = state.posts.findIndex((post: any) => post.id === id)
    if(indexPost >= 0) {
      state.posts[indexPost].children = data
    }
  }

  async function postComment(comment: any) {
    await api.ftch('/items/posts', {
      method: 'post',
      body: {
        description: comment.description,
        parent: comment.parent
      }
    })
    getComment(comment.parent);
    // getPost()
    console.log(':postComment', comment.parent)
  }

  async function deleteComment(id: string, post_id: string) {
    // if (confirm('Удалить пост ?')) {}
      await api.ftch(`items/posts/${id}`, {
        method: 'delete',
      });
      getComment(post_id)
      // getPost()
      console.log('deleteComment')
  }
  
  return {
    state,

    // editUsers,
    deletePost,
    postPost,
    getPost,
    getUser,
    getComment,
    postComment,
    deleteComment,
    postUser,
    getMyPosts,
  };
});
