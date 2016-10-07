var vForm = document.getElementById('mgform');
var vInput = document.getElementById('mail');

// vForm.onsubmit = function() {
// // if (this.hid == "bulk") {
// //     location = "/submit/" + encodeURIComponent(vInput.value);
// // }
// if (this.hid == "list") {
//     location = "/validate/" + encodeURIComponent(vInput.value);
// }
// if (this.hid == "inv") {
//     location = "/invoice/" + encodeURIComponent(vInput.value);
// }
//
// return false;
// }

var editor = tinymce.init({
    selector: '#text',
    inline: false
});

// editor.on('PreInit', function(e) {
//   console.log(tinymce.editors.length);
//   for (var i = 0; i < tinymce.editors.length; i++)
//   {
//       console.log("Editor id:", tinymce.editors[i].id);
//   }
// });
function second_passed() {
  console.log(tinymce.get('text').getContent());
}
setTimeout (second_passed, 5000);

// console.log(tinymce.editors.length);
//
// for (var i = 0; i < tinymce.editors.length; i++)
// {
//     console.log("Editor id:", tinymce.editors[i].id);
// }
// console.log(tinymce.get('text'));
