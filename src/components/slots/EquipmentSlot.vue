<template>
  <div class="slot" :class="[type, { bound: isBound }]">
    <template v-if="equip != undefined && equip.id != 0">
      <template v-if="equip.enhancement.current > 0">
        <span class="lead text-light"> +{{ equip.enhancement.current }} </span>
      </template>

      <Equipment :equip="equip" />
    </template>
  </div>
</template>

<script>
import Equipment from "../inventory/Equipment";

export default {
  name: "EquipmentSlot",
  components: {
    Equipment
  },
  props: {
    type: String,
    equip: Object,
    isBound: Boolean
  },
  computed: {
    gradeClass: function() {
      let equip = this.equip;
      return equip != undefined && equip.id != 0 ? equip.grade : "";
    }
  }
};
</script>

<style scoped>
.slot {
  display: inline-block;
  width: 64px;
  height: 64px;
  background: #ddd;
  border-radius: 50%;
  border: 2px solid #999;
  background-position: center;
  position: relative;
  vertical-align: middle;
}

.slot.bound {
  border-color: transparent;
}

.slot span {
  position: absolute;
  top: -4px;
  left: -8px;
  text-shadow: 0.75px 0 0 black, -0.75px 0 0 black, 0 0.75px 0 black,
    0 -0.75px 0 black;
}

.slot.mainhand {
  background-image: url(~@/assets/placeholders/mainhand.png);
}

.slot.offhand {
  background-image: url(~@/assets/placeholders/offhand.png);
}

.slot.helmet {
  background-image: url(~@/assets/placeholders/helmet.png);
}

.slot.armor {
  background-image: url(~@/assets/placeholders/armor.png);
}

.slot.gloves {
  background-image: url(~@/assets/placeholders/gloves.png);
}

.slot.shoes {
  background-image: url(~@/assets/placeholders/shoes.png);
}
</style>
