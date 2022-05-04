function checkSpecialChars(sentences) {
    const format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    const specialChars = "!@#$^&%*()+=-[]\/{}|:<>?,.";
    if (format.test(sentences)) {
      for (var i = 0; i < specialChars.length; i++) {
        sentences = sentences.replace(new RegExp("\\" + specialChars[i], "g"), "");
      }
      return sentences;
    }
    return sentences;
}
export {
    checkSpecialChars
}