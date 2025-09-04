import Swal from "sweetalert2";

export const showSuccessModal = (title?: string, descrip?: string) => {
  Swal.fire({
    html: `
      <div class="my-custom-modal flex flex-col items-center justify-start gap-4">
        <img class="w-10 h-10" src="https://cdn-icons-png.flaticon.com/512/148/148767.png" alt="img" />
        <p class="custom-text text-[18px] font-medium">${title || "Success!"}</p>
        <p>${descrip || ""}</p>
      </div>
    `,
    showConfirmButton: false,
    customClass: {
      popup: "w-fit px-14",
    },
    timer: 3000,
    timerProgressBar: false,
  });
};

export const showErrorModal = (title?: string, descrip?: string) => {
  Swal.fire({
    html: `
      <div class="my-custom-modal flex flex-col items-center justify-start gap-4">
        <img class="w-10 h-10" src="https://static.vecteezy.com/system/resources/previews/026/526/158/non_2x/error-icon-vector.jpg" alt="img" />
        <p class="custom-text text-[20px] font-semibold">${title || "Error"}</p>
        <p>${descrip || ""}</p>
      </div>
    `,
    showConfirmButton: false,
    customClass: {
      popup: "w-fit px-14",
    },
    timer: 3000,
    timerProgressBar: false,
  });
};

export const showMailModal = (title?: string, descrip?: string) => {
  Swal.fire({
    html: `
      <div class="my-custom-modal flex flex-col items-center justify-start gap-4">
        <img class="w-10 h-10" src="https://e7.pngegg.com/pngimages/105/439/png-clipart-white-and-blue-message-icon-illustration-email-computer-icons-symbol-message-inbox-by-gmail-envelope-miscellaneous-blue-thumbnail.png" alt="img" />
        <p class="custom-text text-[20px] font-semibold">${title || "Check your inbox"}</p>
        <p>${descrip || ""}</p>
      </div>
    `,
    showConfirmButton: false,
    customClass: {
      popup: "w-fit px-14",
    },
    timer: 3000,
    timerProgressBar: false,
  });
};



export const successModal = (descrip?: string) => {
  Swal.fire({
    html: `
      <div class="my-custom-modal flex flex-col items-center justify-start gap-4">
        <p>${descrip || ""}</p>
      </div>
    `,
    showConfirmButton: false,
    customClass: {
      popup: "w-fit px-14",
    },
    timer: 3000,
    timerProgressBar: false,
  });
};

export const showSuccessAlert = (descrip?: string) => {
  Swal.fire({
    html: `
    <div class="my-custom-modal flex items-start justify-start gap-2 px-6 py-1 text-[14px]">
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#349e09" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
</svg>
      ${descrip ? `<p>${descrip}</p>` : ""}
    </div>
  `,
    showConfirmButton: false,
    customClass: {
      popup: "w-fit px-5",
      htmlContainer: 'custom-swal'
    },
    timer: 2000,
    timerProgressBar: false,
  });
};
export const showErrorAlert = (descrip?: string) => {
  Swal.fire({
    html: `
    <div class="my-custom-modal flex items-start justify-start gap-2 px-6 py-1 text-[14px] text-[#f27020]">
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#f27020" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
</svg>
      ${descrip ? `<p>${descrip}</p>` : ""}
    </div>
  `,
    showConfirmButton: false,
    customClass: {
      popup: "w-fit px-5",
      htmlContainer: 'custom-swal'
    },
    timer: 2000,
    timerProgressBar: false,
  });
};
