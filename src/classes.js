export class Stratagem {
  constructor(name, isBackpack, category, codestring, image, AT) {
    this.name = name;
    this.isBackpack = isBackpack;
    this.category = category;
    this.codestring = codestring;
    this.image = image;
    this.at = AT;
  }
}

export class Equipment {
  constructor(name, category, subcategory, warbond, image) {
    this.name = name;
    this.category = category;
    this.subcategory = subcategory;
    this.warbond = warbond;
    this.image = image;
  }
}
