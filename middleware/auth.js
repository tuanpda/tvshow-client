
export default async function({ $auth, redirect }) {
    let user = $auth.$state.user;
    // if (user) {
    //   console.log('login')
    // } else {
    //   redirect('/login') 
    // }
    if (!user) {
      return redirect('/notAuthenticated')
    }
  }


  // export default function({store, redirect}) {
  //   const isAuth = store.getters['auth/isAuthenticated']
  
  //   if (!isAuth) {
  //     return redirect('/notAuthenticated')
  //   }
  // }