# Autocomplete

### Instructions

The goal of this interview is for you to create a User Interface that performs autocomplete against a dictionary of words using an API endpoint. The frontend interface (as simple as an input in the middle of a page) displays matches based on user input (think of how iOS keyboard autocomplete looks/works as an example). So if the user types “foo” you'll want to look up results using the API and display the results such that the user could select one.

The only thing selection absolutely needs to do is console.log the chosen result item. You should avoid using external libraries that attempt to solve too much of the problem — they may restrict your being able to show us where you shine.

The goal of this interview is to learn what you can do in a fixed amount of time to deliver the best user experience possible (and what that means to you) - we’re hoping to see your creativity and ingenuity and debugging skills over something that merely works.

### API endpoint

https://autocomplete-lyart.vercel.app/api/words

The GET endpoint accepts 2 query parameters:

- query
  - This is the search string to find matching words
  - No query will return the first words in the list
- limit
  - The maximum number of words to return
  - Default is 5
