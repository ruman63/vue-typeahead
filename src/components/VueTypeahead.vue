<template>
    <div class="Vue-Select__wrapper" v-click-outside="cancel">
        <button class="Vue-Select__button" @focus.prevent="open">
            <span v-if="selectedItem">
                <slot name="selected">{{selectedItem.text}}</slot>
            </span>
            <span v-else 
                v-text="placeholder"
                class="text-black-50">
            </span>
            <div class="Vue-Select__icon">
                <svg viewBox="0 0 10 5" width="10" height=5>
                    <polygon points="0,0 5,5 10,0"></polygon>
                </svg> 
            </div>
        </button>
        <transition name="flip">
            <div v-if="isOpen" class="Vue-Select__options-container">
                <div class="Vue-Select__input-wrapper">
                    <input type="text" 
                    ref="input"
                    v-model="query"
                    @keydown.esc="cancel"
                    @keydown.tab="isOpen = false"
                    @keydown.enter="selectItem(highlightedItemIndex)" 
                    @keydown.up="moveUp"
                    @keydown.down="moveDown"
                    class="Vue-Select__input">
                </div>
                <ul ref="options" class="Vue-Select__options">
                    <li v-for="(option, index) in searchData" :key="index" 
                        @click="selectItem(index)"
                        @mouseover="highlightItem(index)"
                        :class="{'selected': selectedItemIndex == index, 'highlighted': highlightedItemIndex == index}"
                        >
                            <slot name="option">{{ option.text }}</slot>
                    </li>
                </ul>
            </div>
        </transition>
    </div>
</template>
<script>
import ClickOutside from "../click-outside.js";
export default {
  props: {
    placeholder: { default: "Select an Item from List..." }
  },
  directives: { ClickOutside },
  data() {
    return {
      query: "",
      isOpen: false,
      selectedItemIndex: -1,
      highlightedItemIndex: 0,
      data: [
        { id: 1, text: "Wtf Option 1" },
        { id: 2, text: "Some Option 2" },
        { id: 3, text: "Lol Option 3" },
        { id: 4, text: "There Option 4" },
        { id: 5, text: "Here Option 5" },
        { id: 6, text: "Where Option 6" },
        { id: 7, text: "Nope Option 7" },
        { id: 8, text: "Ohh Option 8" },
        { id: 9, text: "Yeah Option 9" }
      ]
    };
  },
  methods: {
    open() {
      this.isOpen = true;
      this.$nextTick(() => this.$refs.input.focus());
    },
    cancel() {
      this.selectedItemIndex = -1;
      this.isOpen = false;
    },
    selectItem(index) {
      this.selectedItemIndex = index;
      this.isOpen = false;
      this.$emit("change", this.selectedItem);
    },
    highlightItem(index) {
      this.highlightedItemIndex = index % this.data.length;
      if (this.highlightedItemIndex < 0) {
        this.highlightItem(this.data.length - 1);
      }
      this.$refs.options.children[this.highlightedItemIndex].scrollIntoView({
        block: "nearest"
      });
    },
    moveDown() {
      this.highlightItem(this.highlightedItemIndex + 1);
    },
    moveUp() {
      this.highlightItem(this.highlightedItemIndex - 1);
    }
  },
  computed: {
    selectedItem() {
      return this.data[this.selectedItemIndex];
    },
    searchData() {
      return this.data.filter(item =>
        item.text.match(new RegExp(`^${this.query}`, "i"))
      );
    }
  }
};
</script>
<style>
.Vue-Select__wrapper {
  position: relative;
  text-align: left;
  display: inline-block;
  min-width: 18em;
  box-sizing: border-box;
}
.Vue-Select__wrapper * {
  box-sizing: border-box;
}
.Vue-Select__button {
  position: relative;
  padding: 0.5rem 1.5rem 0.5rem 1rem;
  border: 1px solid #ccc;
  border-radius: 0.25rem;
  text-align: left;
  width: 100%;
  background: white;
}
.Vue-Select__icon {
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  width: 1.5rem;
  align-items: center;
  justify-content: center;
  pointer-events: none;
}
.Vue-Select__options-container {
  position: absolute;
  left: 0;
  right: 0;
  min-width: 100%;
  margin-top: 0.5rem;
  background-color: whitesmoke;
  color: black;
  padding: 1rem 0;
  border: 1px solid #ccc;
  border-radius: 0.25rem;
}
.Vue-Select__input-wrapper {
  padding: 0 1rem;
}
.Vue-Select__input {
  width: 100%;
  border: 1px solid #ccc;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
}
.Vue-Select__options {
  list-style: none;
  margin: 0.5rem 0;
  padding: 0;
  max-height: 18rem;
  overflow-y: auto;
}
.Vue-Select__options > li {
  padding: 0.5rem 1rem;
}

.Vue-Select__options > .highlighted {
  background-color: rgba(0, 0, 0, 0.1);
}

.Vue-Select__options > .selected {
  background-color: blue;
  color: white;
}

.flip-enter-active,
.flip-leave-active {
  transition: all 0.3s;
}
.flip-enter,
.flip-leave-to {
  opacity: 0;
  transform-origin: 50% 0;
  transform: perspective(1000px) rotateX(-25deg);
}
</style>
