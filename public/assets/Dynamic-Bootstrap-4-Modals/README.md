# bootstrap-show-modal

jQuery plugin to create bootstrap 4 modals in pure JavaScript.

[Demo Page](https://shaack.com/projekte/bootstrap-show-modal)

## Installation

```bash
npm install -save bootstrap-show-modal
```

Or just download this repository and include `src/bootstrap-show-modal.js`.

## Usage

### Simple Modal
```javascript
$.showModal({title: "Hello World!", body: "A very simple modal dialog without buttons."})
```

### Alert Dialog
```javascript
$.showAlert({title: "Hi", body: "Please press ok, if you like or dislike cookies."})
```

### Confirm Dialog
```javascript
$.showConfirm({
    title: "Please confirm", body: "Do you like cats?", textTrue: "Yes", textFalse: "No",
    onSubmit: function (result) { // callback on confirm
        if (result) {
            $.showAlert({title: "Result: " + result, body: "You like cats."})
        } else {
            $.showAlert({title: "Result: " + result, body: "You don't like cats."})
        }
    },
    onDispose: function() {
        console.log("The confirm dialog vanished")
    }
})
```

## Properties

```javascript
props = {
    title: "", // the dialog title html
    body: "", // the dialog body html
    footer: "", // the dialog footer html (mainly used for buttons)
    modalClass: "fade", // Additional css for ".modal", "fade" for fade effect
    modalDialogClass: "", // Additional css for ".modal-dialog", like "modal-lg" or "modal-sm" for sizing
    options: null, // The Bootstrap modal options as described here: https://getbootstrap.com/docs/4.0/components/modal/#options
    // Events:
    onCreate: null, // Callback, called after the modal was created
    onDispose: null, // Callback, called after the modal was disposed
    onSubmit: null // $.showConfirm only. Callback, called after yes or no was pressed
}
```

[Also see the Bootstrap 4 Modal documentation](https://getbootstrap.com/docs/4.0/components/modal/). 


