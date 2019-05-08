export class Session {

  static Get(url) {
    return new Get(url);
  }

  static Post(url) {
    return new Post(url);
  }
}

export class SessionBase {

  constructor(url) {
    this.url = url;
  }
}
