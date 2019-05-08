
const CONTENT_TYPE_DEFAULT = "x-www-form-urlencoded";
const CONTENT_TYPE_FORMDATA = "multipart/form-data";
const CONTENT_TYPE_JSON = "application/json";


/**
 *
 */
export class Request{

  /**
   * 构建Get请求对象
   * @param url
   * @returns {Get}
   * @constructor
   */
  static Get(url){
    return new Get(url);
  }

  /**
   * 构建Post请求对象
   * @param url
   * @returns {Post}
   * @constructor
   */
  static Post(url){
    return new Post(url);
  }

  static get CONTENT_TYPE_DEFAULT() {
    return CONTENT_TYPE_DEFAULT
  }

  static get CONTENT_TYPE_FORMDATA() {
    return CONTENT_TYPE_FORMDATA
  }

  static get CONTENT_TYPE_JSON() {
    return CONTENT_TYPE_JSON
  }
}


class RequestBase {

  constructor(url){
    this.url = url;
  }

  headers(params = {}){
    this.headers = params;
    return this;
  }

  body(params = {}, contentType = Request.CONTENT_TYPE_DEFAULT){
    this.body = params;
    this.contentType = contentType;
    return this;
  }

  then(resolve){
    this.promise.then(resolve);
    return this;
  }

  catch(reject){
    this.promise.catch(reject);
    return this;
  }

}

class Post extends RequestBase{

  execute(){

      this.promise = new Promise((resolve, reject) => {
        var xhr = new XMLHttpRequest();

        xhr.open("POST", this.url, true);
        xhr.setRequestHeader("Content-Type", this.contentType);
        for(var key of Object.keys(this.headers)){
          xhr.setRequestHeader(key, this.headers[key]);
        }

        xhr.onreadystatechange = function() {//Call a function when the state changes.

          if(this.readyState == XMLHttpRequest.DONE) {

            if(this.status == 200){
              resolve(JSON.parse(xhr.response));
            }else{
              reject({status: this.status, responseText: xhr.responseText});
            }
          }

        }

        // console.debug(this.contentType);
        if(this.body && Object.keys(this.body).length > 0){
          if(this.contentType === Request.CONTENT_TYPE_JSON){
            xhr.send(JSON.stringify(this.body));
          }else if(this.contentType === Request.CONTENT_TYPE_FORMDATA){
            //this.body
            let formData = new FormData();
            for(let key of Object.keys(this.body)){
              formData.append(key, this.body[key])
            }
            xhr.send(formData);
          }else{
            let bodyString = "";
            for(let key of Object.keys(this.body)){
              bodyString += `${key}=${this.body[key]}&`;
            }
            xhr.send(bodyString);
          }

        }else{
          xhr.send();
        }

      });

      return this;
  }

}

class Get extends RequestBase{

  execute(){

    this.promise = new Promise((resolve, reject) => {
      console.log(this.url);
      let urlObj = new URL(this.url);
      for(var key of Object.keys(this.body)){
        urlObj.searchParams.append(key, this.body[key]);
      }
      let modifyUrl = urlObj.href;

      var xhr = new XMLHttpRequest();
      xhr.open("GET", modifyUrl, true);
      //xhr.setRequestHeader("Content-Type", this.contentType);
      for(var key of Object.keys(this.headers)){
        xhr.setRequestHeader(key, this.headers[key]);
      }

      xhr.onreadystatechange = function() {//Call a function when the state changes.

        if(this.readyState == XMLHttpRequest.DONE) {

          if(this.status == 200){
            resolve(JSON.parse(xhr.response));
          }else{
            //reject(xhr.responseText);
            reject({status: this.status, responseText: xhr.responseText});
          }
        }
      }

      xhr.send();

    });

    return this;

  }
}

//输出
//module.exports = {"Request": Request};
