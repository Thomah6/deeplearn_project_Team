<script setup>
import Header from '@/components/layout/Header.vue';
import Footer from '@/components/layout/Footer.vue';
import Sidebar from '@/components/layout/Sidebar.vue';
</script>
<template>

<div class="w-full">
<Header />

<Sidebar />
<div class="w-full">
   <div class="min-h-screen   relative inset-x-0 flex flex-wrap md:justify-start md:flex-nowrap w-full text-sm py-2.5 lg:ps-65">
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum assumenda modi at quo minus, rem aliquid magnam qui sit consequatur. Deserunt id doloribus non cupiditate eius nobis voluptas vitae fuga!
 <RouterView></RouterView>
   </div>
    <Footer />
</div>

</div>

</template>