export function calculateAge(birthdate) {
    const today = new Date();
    const birthdateArray = birthdate.split("/");
    const birthYear = birthdateArray[2];
    const birthMonth = birthdateArray[1] - 1; // Month index starts from 0 in JS
    const birthDay = birthdateArray[0];
    const birthdateObj = new Date(birthYear, birthMonth, birthDay);
    const age = today.getFullYear() - birthdateObj.getFullYear();
    const monthDiff = today.getMonth() - birthdateObj.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthdateObj.getDate())) {
      // If the user's birthday hasn't happened yet this year, subtract 1 from age
      return age - 1;
    }
    
    return age;
  }

  export function validateZipcode(zipcode) {
    const regex = /^\d{5}$/;
    return regex.test(zipcode);
  }

  export function convertDateFormat(dateString) {
    // Parse the original date string into a Date object
    const [day, month, year] = dateString.split("/");
    const dateObject = new Date(year, month - 1, day);
    return dateObject;
  }