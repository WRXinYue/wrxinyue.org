<script>
import FocusTrap from 'primevue/focustrap'
import TimesIcon from 'primevue/icons/times'
import Portal from 'primevue/portal'
import Ripple from 'primevue/ripple'
import { DomHandler, ZIndexUtils } from 'primevue/utils'
import BaseSidebar from './BaseSidebar.vue'

export default {
  name: 'Sidebar',
  directives: {
    focustrap: FocusTrap,
    ripple: Ripple,
  },
  components: {
    Portal,
    TimesIcon,
  },
  extends: BaseSidebar,
  inheritAttrs: false,
  emits: ['update:visible', 'show', 'hide', 'after-hide'],
  data() {
    return {
      containerVisible: this.visible,
    }
  },
  container: null,
  mask: null,
  content: null,
  headerContainer: null,
  closeButton: null,
  outsideClickListener: null,
  documentKeydownListener: null,
  computed: {
    fullScreen() {
      return this.position === 'full'
    },
    closeAriaLabel() {
      return this.$primevue.config.locale.aria ? this.$primevue.config.locale.aria.close : undefined
    },
  },
  updated() {
    if (this.visible)
      this.containerVisible = this.visible
  },
  beforeUnmount() {
    this.disableDocumentSettings()

    if (this.mask && this.autoZIndex)
      ZIndexUtils.clear(this.mask)

    this.container = null
    this.mask = null
  },
  methods: {
    hide() {
      this.$emit('update:visible', false)
    },
    onEnter() {
      this.$emit('show')
      this.focus()
      this.bindDocumentKeyDownListener()

      if (this.autoZIndex)
        ZIndexUtils.set('modal', this.mask, this.baseZIndex || this.$primevue.config.zIndex.modal)
    },
    onAfterEnter() {
      this.enableDocumentSettings()
    },
    onBeforeLeave() {
      if (this.modal)
        !this.isUnstyled && DomHandler.addClass(this.mask, 'p-component-overlay-leave')
    },
    onLeave() {
      this.$emit('hide')
    },
    onAfterLeave() {
      if (this.autoZIndex)
        ZIndexUtils.clear(this.mask)

      this.unbindDocumentKeyDownListener()
      this.containerVisible = false
      this.disableDocumentSettings()
      // eslint-disable-next-line vue/custom-event-name-casing
      this.$emit('after-hide')
    },
    onMaskClick(event) {
      if (this.dismissable && this.modal && this.mask === event.target)
        this.hide()
    },
    focus() {
      const findFocusableElement = (container) => {
        return container && container.querySelector('[autofocus]')
      }

      let focusTarget = this.$slots.header && findFocusableElement(this.headerContainer)

      if (!focusTarget) {
        focusTarget = this.$slots.default && findFocusableElement(this.container)

        if (!focusTarget)
          focusTarget = this.closeButton
      }

      focusTarget && DomHandler.focus(focusTarget)
    },
    enableDocumentSettings() {
      if (this.dismissable && !this.modal)
        this.bindOutsideClickListener()

      if (this.blockScroll)
        DomHandler.blockBodyScroll()
    },
    disableDocumentSettings() {
      this.unbindOutsideClickListener()

      if (this.blockScroll)
        DomHandler.unblockBodyScroll()
    },
    onKeydown(event) {
      if (event.code === 'Escape')
        this.hide()
    },
    containerRef(el) {
      this.container = el
    },
    maskRef(el) {
      this.mask = el
    },
    contentRef(el) {
      this.content = el
    },
    headerContainerRef(el) {
      this.headerContainer = el
    },
    closeButtonRef(el) {
      this.closeButton = el
    },
    bindDocumentKeyDownListener() {
      if (!this.documentKeydownListener) {
        this.documentKeydownListener = this.onKeydown
        document.addEventListener('keydown', this.documentKeydownListener)
      }
    },
    unbindDocumentKeyDownListener() {
      if (this.documentKeydownListener) {
        document.removeEventListener('keydown', this.documentKeydownListener)
        this.documentKeydownListener = null
      }
    },
    bindOutsideClickListener() {
      if (!this.outsideClickListener) {
        this.outsideClickListener = (event) => {
          if (this.isOutsideClicked(event))
            this.hide()
        }

        document.addEventListener('click', this.outsideClickListener)
      }
    },
    unbindOutsideClickListener() {
      if (this.outsideClickListener) {
        document.removeEventListener('click', this.outsideClickListener)
        this.outsideClickListener = null
      }
    },
    isOutsideClicked(event) {
      return this.container && !this.container.contains(event.target)
    },
  },
}
</script>

<template>
  <Portal>
    <div v-if="containerVisible" :ref="maskRef" :class="cx('mask')" :style="sx('mask', true, { position })" v-bind="ptm('mask')" @mousedown="onMaskClick">
      <transition
        name="p-sidebar"
        appear
        v-bind="ptm('transition')"
        @enter="onEnter"
        @after-enter="onAfterEnter"
        @before-leave="onBeforeLeave"
        @leave="onLeave"
        @after-leave="onAfterLeave"
      >
        <div v-if="visible" :ref="containerRef" v-focustrap :class="cx('root')" role="complementary" :aria-modal="modal" v-bind="{ ...$attrs, ...ptm('root') }">
          <slot v-if="$slots.container" name="container" :on-close="hide" :close-callback="hide" />
          <template v-else>
            <div :ref="headerContainerRef" :class="cx('header')" v-bind="ptm('header')">
              <slot name="header" :class="cx('title')">
                <div v-if="header" :class="cx('title')" v-bind="ptm('title')">
                  {{ header }}
                </div>
              </slot>
              <button
                v-if="showCloseIcon"
                :ref="closeButtonRef"
                v-ripple
                type="button"
                :class="cx('closeButton')"
                :aria-label="closeAriaLabel"
                v-bind="ptm('closeButton')"
                data-pc-group-section="iconcontainer"
                @click="hide"
              >
                <slot name="closeicon" :class="cx('closeIcon')">
                  <component :is="closeIcon ? 'span' : 'TimesIcon'" :class="[cx('closeIcon'), closeIcon]" v-bind="ptm('closeIcon')" />
                </slot>
              </button>
            </div>
            <div :ref="contentRef" :class="cx('content')" v-bind="ptm('content')">
              <slot />
            </div>
          </template>
        </div>
      </transition>
    </div>
  </Portal>
</template>
