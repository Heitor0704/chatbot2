//Funções que facilitam o uso das mensagens

function replaceAllPlaceholders(inputString, replacements) {
    let currentIndex = 0;
    const regex = /\{([^{}]+)\}/g;
  
    return inputString.replace(regex, (_, placeholder) => {
      const replacement = replacements[currentIndex];
      currentIndex = (currentIndex + 1) % replacements.length;
      return replacement;
    });
  }
function addJid(phone_number)
{
  return phone_number+"@s.whatsapp.net";
}
module.exports = {
    replaceAllPlaceholders,
    addJid,
}