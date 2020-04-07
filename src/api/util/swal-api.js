/* eslint-disable linebreak-style */
import swal from 'sweetalert';
import spinnerGif from '../../resources/gifs/spinner.gif';

const swalApi = {

  openLoadingModal: (action = 'Loading') => {
    if (!swal.getState().isOpen)
      swal({
        title: "",
        text: action + ", please wait...",
        icon: spinnerGif,
        buttons: false,
        closeOnClickOutside: false
      });
  },

  closeLoadingModal: () => {
    if (swal.getState().isOpen)
      swal.close();
  },

  openConfirmation: (message, title, confirmMessage, content) =>
    swal({
      title: title || "Confirm",
      text: message,
      icon: "warning",
      dangerMode: true,
      content: content,
      buttons: ["Cancel", confirmMessage || "Confirm"],
    }),

    openDualActionConfirmation: (message, title, button1, button2) =>
    swal({
      title: title || "Confirm",
      text: message,
      icon: "warning",
      dangerMode: true,
      buttons: {
        cancel: true,
        button1: {
          text: button1,
          value: button1,
        },
        button2: {
          text: button2,
          value: button2,
        },
      },
    }),

  openSelection: (message, title, confirmMessage, content) =>
    swal({
      title: title || "Confirm",
      text: message,
      icon: "warning",
      dangerMode: true,
      content: content,
      buttons: ["Cancel", confirmMessage || "Confirm"],
    }),
  
  openEditor: (message, title, confirmMessage, content) =>
    swal({
      title: title || "Confirm",
      text: message,
      content: content,
      buttons: ["Cancel", confirmMessage || "Confirm"]
    }),

  openDeleteConfirmation: (item, message) =>
    swal({
      title: "Remove " + item + "?",
      text: message ? message : "Once removed, you will not be able to recover this " + item,
      icon: "warning",
      dangerMode: true,
      buttons: ["Cancel", "Remove"],
    }),

  error: (error, callback) => {
    let swalAlert = swal("Error", error, "error");
    if (callback)
      swalAlert.then(() => {
        callback();
      });
  },

  success: success => {
    swal("Success", success, "success");
  }
};

export default swalApi;