// Define and export the getXhr function for use in other modules or components.
export default function getXhr() {
  let xhr = null; // Initialize the xhr variable to null.

  try {
    // Try to create an XMLHttpRequest object. This method works in most modern browsers.
    xhr = new XMLHttpRequest();
    console.log("Your browser supports AJAX!"); // Log success for debugging.
  } catch (e) { // Catch any errors if the browser does not support XMLHttpRequest.
    try {
      // Try to use the ActiveXObject which is specific to older versions of Internet Explorer (IE).
      xhr = new ActiveXObject("Msxml2.XMLHTTP");
    } catch (e) { // Catch any errors if the first ActiveXObject instantiation fails.
      try {
        // Attempt to use an older ActiveXObject version for much older IE versions.
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
      } catch (e) { // Catch block to handle the case where all methods fail.
        console.log("Error: Browser does not support AJAX!"); // Log an error message indicating AJAX support failure.
      }
    }
  }
  return xhr; // Return the created xhr object or null if none were successfully created.
}
