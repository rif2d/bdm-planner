import EnhancementData from "../data/enhancement.json";

class Equipment {
  id;
  name;
  type;
  grade;
  stats = {
    ap: 0,
    dp: 0,
    baseAP: 0,
    baseDP: 0
  };
  enhancement = {
    max: 40,
    current: 0
  };
  bound = false;
  enhancementData = EnhancementData;

  constructor(obj = {}) {
    this.id = obj.id || 0;
    this.name = obj.name || "";
    this.type = obj.type || "";
    this.grade = obj.grade || "";

    if (obj.stats !== undefined) {
      this.stats.ap = obj.stats.ap;
      this.stats.dp = obj.stats.dp;
      this.stats.baseAP = obj.stats.ap;
      this.stats.baseDP = obj.stats.dp;
    }
  }

  get fullName() {
    return `${this.name} ${this.type.charAt(0).toUpperCase() +
      this.type.slice(1)}`;
  }

  get imageUri() {
    return `${this.type}/${this.slug}.png`;
  }

  get slug() {
    return this.name
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "");
  }

  get totalCP() {
    return this.stats.ap + this.stats.dp;
  }

  setEnhancement(level) {
    if (level < 0 || level > this.enhancement.max) return;

    const enhanceData = this.enhancementData[this.type][this.grade];
    const enhanceDataUntilLevel = enhanceData.slice(0, level + 1);

    if (["armor", "helmet", "gloves", "shoes"].includes(this.type)) {
      const enhanceSum = enhanceDataUntilLevel.reduce(
        (prev, next) => prev + next,
        this.stats.baseDP
      );

      this.stats.dp = enhanceSum;
    }

    if (this.type == "mainhand") {
      const enhanceSum = enhanceDataUntilLevel.reduce(
        (prev, next) => prev + next,
        this.stats.baseAP
      );

      this.stats.ap = enhanceSum;
    }

    if (this.type == "offhand") {
      const [ap, dp] = enhanceDataUntilLevel.reduce(
        (prev, next) => [prev[0] + next[0], prev[1] + next[1]],
        [this.stats.baseAP, this.stats.baseDP]
      );

      this.stats.ap = ap;
      this.stats.dp = dp;
    }

    this.enhancement.current = level;
  }
}

export default Equipment;
