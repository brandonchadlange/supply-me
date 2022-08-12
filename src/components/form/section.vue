<template>
  <div class="custom-accordion">
    <div class="card text-dark">
      <div class="p-4 py-4">
        <slot name="title"></slot>
      </div>
      <div class="p-4 border-top">
        <slot></slot>
      </div>
    </div>
  </div>
</template>
