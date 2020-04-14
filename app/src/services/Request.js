export const request = (url, options) => {
  function handleErrors(response) {
      if(response.status === 403 && !options.noRedirect){
        window.location.href = "/login";
      }else if (!response.ok) {
          throw Error(response.statusText);
      }else{
        return response;
      }
  }

  return fetch(url, options)
  .then( handleErrors)
  .then( (response) => { return response.json() })
  .then(
    (result) => {
      return { data: result };
    }
  )
  .catch(
    (error) => {
      console.log(error);
      return { error: error };
    }
  )
}