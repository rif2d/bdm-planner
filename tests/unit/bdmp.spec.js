import { expect } from "chai";
// import Equipment from "../../src/objects/Equipment";
// import EquipmentList from "../../src/objects/EquipmentList";
import BDMP from "../../src/objects/BDMP";

describe("BDMP.js", () => {
  it("return an array of equipment", () => {
    expect(new BDMP().equipmentList).to.be.an("array");
  });

  it("return a mainhand", () => {
    var mainhand = new BDMP().equipment.mainhand;
    expect(mainhand)
      .to.be.an("object")
      .include({
        type: "mainhand"
      });
  });

  it("return noir glove", () => {
    var bdmp = new BDMP();
    var noir = bdmp.equipmentList.find(eq => eq.id == 501);
    bdmp.useEquip(501);

    expect(bdmp.equipment.gloves).to.equal(noir);
  });
});