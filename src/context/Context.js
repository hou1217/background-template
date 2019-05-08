/**
 * 项目上下文对象
 */
class Context{

  constructor(vue){

      //env设置
      this.env = vue.$process.env;

      //http相关设置
      this.http = {};
      this.http.responseFilter = function(status, response){

        if(status == 403){
          //TODO 未授权处理

        }else if(typeof response === 'object'){

          if(response.status && response.status === '403'){
            //TODO 未授权处理

          }else if(response.state && response.state === '000004'){
            //TODO 未授权处理

          }

        }
      }

  }



}

export {Context}
