import Swal from "sweetalert2";
export default async function ({ $auth, redirect }) {
  let user = $auth.$state.user;
  if (
    (user && user.luong == 1 && user.dm_dongiacong == 1) ||
    user.role == "admin"
  ) {
    //console.log('ccc') and let user in
  } else {
    redirect("/");
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      },
    });
    Toast.fire({
      icon: "error",
      title: "Bạn không có quyền vào chức năng này",
    });
  }
}
