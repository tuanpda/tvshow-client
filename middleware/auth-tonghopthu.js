

export default async function({ $auth, redirect }) {
  let user = $auth.$state.user;
  if (user && user.role=='admin' || user && user.role=='tonghopthu') {
    //console.log('ccc') and let user in
  } else {
    redirect('/login')
  }
}