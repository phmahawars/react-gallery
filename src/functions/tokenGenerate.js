export const tokenEncode = (str) => {
  const randomChars = ["$_", "_#", "/_", "*_"];
  str = btoa(str);
  console.log(str);
  // Function to insert a character at a specific position
  function insertCharAt(str, char, index) {
    return str.slice(0, index) + char + str.slice(index);
  }

  // Add random characters at random positions
  for (let i = 0; i < randomChars.length; i++) {
    let randomIndex = Math.floor(Math.random() * (str.length + 1));
    str = insertCharAt(str, randomChars[i], randomIndex);
  }

  return str;
};
export const tokenDecode = (str) => {
  // Define the characters you want to remove
  const charsToRemove = ["$_", "_#", "/_", "*_"];
  // Create a regular expression to match these characters
  const regex = new RegExp(`[${charsToRemove.join("")}]`, "g");
  // Remove the characters from the string
  str = str.replace(regex, "");
  return atob(str);
};
