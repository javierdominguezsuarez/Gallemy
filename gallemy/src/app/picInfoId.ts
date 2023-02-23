export class PicInfoId {


    constructor(
      public name: string,
      public description: string,
      public date: string,
      public category: string,
      public user: string | null | undefined,
      public url: string | boolean,
      public id: string 
    ) {  }
  
  }