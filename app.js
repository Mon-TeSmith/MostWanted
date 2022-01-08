"use strict"
//Menu functions.
//Used for the overall flow of the application.
/////////////////////////////////////////////////////////////////
//#region

// app is the function called to start the entire application
function app(people){
    let searchType = promptFor(
      "Do you know the name of the person you are looking for? Enter 'Yes' or 'No'",
      yes,No
    ).toLowerCase(); 
    let searchResults;
    switch (searchType) {
      case "yes":
        searchResults = searchByName(person);
        break;
      case "no":
      searchResults = searchByTraits(people);

        //create an if statement to allow user to choose what they want to search by
        //prompt user and ask what trait they want to search by, list option start with eye color 
        // based on their response if they enter eye color then it should call the searchByEyeColor()
      
        
       function searchByTraits(_people) {
         promptFor ( "Which traits would you like to search for? \n Height \n D.O.B. \n Gender \n Weight \n Occupation \n Eye Color", autoValid);
      callback();
        }
         // TODO: search by traits
       break;
      default:
        app(people); // restart app
        break;
    }
  
    // Call the mainMenu function ONLY after you find the SINGLE person you are looking for
    mainMenu(searchResults, people);
}
 
  // Menu function to call once you find who you are looking for
  function mainMenu(person, people) {
    /* Here we pass in the entire person object that we found in our search, as well as the entire original dataset of people. We need people in order to find descendants and other information that the user may want. */
  
    if (!person) {
      alert("Could not find the individual");
      return app(people); // restart
    }
  
    let displayOption = promptFor(
      "Found " +
        person.firstName +
        " " +
        person.lastName +
       (" . Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'"),
      autoValid
    );
  
    switch (displayOption) {
      case "info":
        // TODO: get person's info
        break;
      case "family":
        // TODO: get person's family
        break;
      case "descendants":
        // TODO: get person's descendants
        break;
      case "restart":
        app(people); // restart
        break;
      case "quit":
        return; // stop execution
      default:
        return mainMenu(person, people); // ask again
    };
  }
  
  //#endregion
  
  //Filter functions.
  //Ideally you will have a function for each trait.
  /////////////////////////////////////////////////////////////////
  //#region
  
  //nearly finished function used to search through an array of people to find matching first and last name and return a SINGLE person object.
  function searchByName(people) {
    let firstName = promptFor("What is the person's first name?", autoValid);
    let lastName = promptFor("What is the person's last name?", autoValid);
  
    let foundPerson = people.filter(function (potentialMatch) {
      if (
        potentialMatch.firstName === firstName &&
        potentialMatch.lastName === lastName
      ) {
        return true;
      } else {
        return false;
      }
    });
    // TODO: find the person single person object using the name they entered.
    //return displayPeople(foundPerson);
      return foundPerson[0];
  }

  function searchByTraits(people){
    // prompt the user for what trait they want to filter by
    let input = prompt("What trait are you searching for?")
    let results;
    switch (input){
      case ["Gender", "DOB", "Weight", "Height", "Eyecolor", "Occupation", "Parents", "CurrentSpouse"]:
        results = searchByTraits(people)
        app("");
        break;
    
      default:
        app("people");
        break;
    }
  }

  function searchByOccupation(people) {
    let occupation = promptFor("What occupation would you like to search for?", autoValid);
    let foundPeople = people.filter(function (potentialMatch) {
      if (potentialMatch.occupation === occupation) {
        return true;
      }
    })
    return foundPeople
  
  }
  
  //unfinished function to search through an array of people to find matching eye colors. Use searchByName as reference.
  function searchByEyeColor(people) {
    let eyeColor = promptFor("What eye color would you like to search for?", autoValid);
    let foundPeople = people.filter(function (potentialMatch) {
      if (potentialMatch.eyeColor === eyeColor){
      return true; 
    }
 })
 return foundPeople 
}

function searchGender(people) {
  let gender = promptFor("What gender would you like to search for?", autoValid);
  let foundPeople = people.filter(function (potentialMatch) {
    if (potentialMatch.gender === gender){
    return true; 
  }
})
return foundPeople 
}

function searchDOB(people) {
  let DOB = promptFor("What DOB would you like to search for?", autoValid);
  let foundPeople = people.filter(function (potentialMatch) {
    if (potentialMatch.DOB === DOB){
    return true; 
  }
})
return foundPeople 
}

function searchWeight(people) {
  let weight = promptFor("What weight would you like to search for?", autoValid);
  let foundPeople = people.filter(function (potentialMatch) {
    if (potentialMatch.weight === weight){
    return true; 
  }
})
return foundPeople 
}

function searchHeight(people) {
  let height = promptFor("What height would you like to search for?", autoValid);
  let foundPeople = people.filter(function (potentialMatch) {
    if (potentialMatch.height === height){
    return true; 
  }
})
return foundPeople 
}

function searchParents(people) {
  let parents = promptFor("What parents would you like to search for?", autoValid);
  let foundPeople = people.filter(function (potentialMatch) {
    if (potentialMatch.parents === parents){
    return true; 
  }
})
return foundPeople 
}

function searchCurrentSpouse(people) {
  let currentSpouse = promptFor("What current spouse would you like to search for?", autoValid);
  let foundPeople = people.filter(function (potentialMatch) {
    if (potentialMatch.currentSpouse === currentSpouse){
    return true; 
  }
})
return foundPeople 
}
  //TODO: add other trait filter functions here.
  
  //#endregion
  
  //Display functions.
  //Functions for user interface.
  /////////////////////////////////////////////////////////////////
  //#region
  
  // alerts a list of people
  function displayPeople(people) {
    alert(
      people
        .map(function (person) {
          return person.firstName + " " + person.lastName;
        })
        .join("\n")
    );
  }
  
  function displayPerson(person) {
    // print all of the information about a person:
    // height, weight, age, name, occupation, eye color.
    let personInfo = "First Name: " + person.firstName + "\n";
    personInfo += "Last Name: " + person.lastName + "\n";
    // TODO: finish getting the rest of the information to display.
    alert(personInfo);
  }
  
  //#endregion
  
  //Validation functions.
  //Functions to validate user input.
  /////////////////////////////////////////////////////////////////
  //#region
  
  //a function that takes in a question to prompt, and a callback function to validate the user input.
  //response: Will capture the user input.
  //isValid: Will capture the return of the validation function callback. true(the user input is valid)/false(the user input was not valid).
  //this function will continue to loop until the user enters something that is not an empty string("") or is considered valid based off the callback function(valid).
  function promptFor(question, valid) {
    let isValid;
    let response;
    do {
      response = prompt(question);
      isValid = valid(response);
    } while (response === "" || isValid === false);
    return response;
  }
  
  // helper function/callback to pass into promptFor to validate yes/no answers.
  function yesNo(input) {
    if (input.toLowerCase() == "yes" || input.toLowerCase() == "no") {
      return true;
    } else {
      return false;
    }
  }
  
  // helper function to pass in as default promptFor validation.
  //this will always return true for all inputs.
  function autoValid(input) {
    return true; // default validation only
  }
  
  //Unfinished validation function you can use for any of your custom validation callbacks.
  //can be used for things like eye color validation for example.
  function customValidation(input) {}
  
  //#endregion