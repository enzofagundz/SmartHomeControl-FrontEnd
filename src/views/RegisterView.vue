<script setup lang="ts">
const router = useRouter();

onMounted(() =>{
    
})

</script>

<template>
    <section>
        <form action="">
            <div class="w-full max-w-xs form-control">
                <label class="label">
                    <span class="label-text">What is your name?</span>
                    <span class="label-text-alt">Top Right label</span>
                </label>
                <input type="text" placeholder="Type here" class="w-full max-w-xs input input-bordered" />
                <label class="label">
                    <span class="label-text-alt">Bottom Left label</span>
                    <span class="label-text-alt">Bottom Right label</span>
                </label>
            </div>
            <button class="btn btn-outline btn-info">Enviar</button>
        </form>
    </section>
</template>

<style scoped></style>