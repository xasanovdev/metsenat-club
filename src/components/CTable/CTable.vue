<template>
  <div class="w-full min-w-[1200px] overflow-x-auto">
    <div class="container mx-auto overflow-hidden min-w-[1200px] overflow-x-auto">
      <ul class="w-full whitespace-nowrap list-none p-0">
        <!-- students list row head cells -->
        <slot name="header"> </slot>
      </ul>
    </div>

    <div class="flex items-center justify-between">
      <slot name="body"> </slot>
    </div>
  </div>
</template>
