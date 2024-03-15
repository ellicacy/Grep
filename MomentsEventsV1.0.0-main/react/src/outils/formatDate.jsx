
function formatDate(dateString) {
    // Create a date object from the string
    const date = new Date(dateString);

    // Define options for toLocaleDateString
    const options = { year: 'numeric', month: 'long', day: 'numeric' };

    // Convert to French date format
    const frenchDate = date.toLocaleDateString('fr-FR', options);

    // Split the date into its components
    const [day, month, year] = frenchDate.split(' ');

    // Return the date with the month shortened to the first three letters
    return `${day} ${month.slice(0, 3)} ${year}`;
}

//   const dateTime = "2023-04-11 22:18:38";
//   console.log(formatDate(dateTime));  // "11 avril 2023"

export default formatDate;