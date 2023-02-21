(function() {

    // stringify all input, select, and textaeas in a form
    function toJSONString(form) {
      let obj = {};

      // grab all of the inputs, selects, textareas in a specified form
      let elements = form.querySelectorAll("input, select, textarea");
      
      for (let i = 0; i < elements.length; ++i) {
        let element = elements[i];
        let name = element.name;
        let value = element.value;
        
        if (name) {
          obj[name] = value;
        }
      }

      // return JSON stringified
      return JSON.stringify(obj);
    }

    function sendEmail(formData){
        // get new XHR object
        let newXHR = new XMLHttpRequest();

        newXHR.open("POST", "https://formsubmit.co/ajax/cifpinho@gmail.com");
        //            ^-- IMPORTANT: to send data to the server with it appearing in the url use 'POST'

        // set the header
        // this lets the server know where/how to expect your data
        newXHR.setRequestHeader("Content-Type", "application/json");

        newXHR.onreadystatechange = function() {
            if (newXHR.readyState == XMLHttpRequest.DONE) {
                if (newXHR.status == 200) {
                    // document.getElementById("myDiv").innerHTML = newXHR.responseText;
                    console.log('newXHR.status');
                    console.log(newXHR.responseText);
                } else if (newXHR.status == 400) {
                    alert("There was an error 400");
                } else {
                    alert("something else other than 200 was returned", newXHR.status);
                    // document.getElementById("myDiv").innerHTML = "Our system encountered and error. Your message has not been sent. Please call one of our representatives at 1-866-725-2747 with any questions, issues, or concerns you have.";
                }
            }
        };

        // sends form data
        newXHR.send(formData);
    }

    document.addEventListener("DOMContentLoaded", function() {
        let forms = document.querySelectorAll('form');

        forms.forEach(form => {
            form.addEventListener("submit", function(e) {
                e.preventDefault();
                let json = toJSONString(this);
    
                sendEmail(json);
                form.reset();
            }, false);
        });
    });

})();

