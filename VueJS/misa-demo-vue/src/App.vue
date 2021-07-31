<template>
  <div>
    <Navbar></Navbar>
    <Header></Header>
    <Content></Content>
 <Modal></Modal>
  </div>
</template>

<script>
import Navbar from './components/layout/navbar.vue'
import Header from './components/layout/header.vue'
import Content from './components/layout/content.vue'
import Modal from './components/layout/modal.vue'

export default {
  name: 'App',
  components: {
    Navbar,
    Header,
    Content,
   Modal,
  },
};
  
</script>

<style>
@import "./css/main.css";
</style>
