<template>
    <BContainer>
        <BCard>
            <BForm @submit="emit('submit')">
                <BFormGroup
                    id="input-email"
                    label="Email address:"
                    label-for="email"
                    description="We'll never share your email with anyone else."
                    >
                    <BFormInput
                        id="email"
                        v-model="form.email"
                        type="email"
                        placeholder="Enter email"
                    />
                </BFormGroup>
                <BFormGroup
                    id="input-pwd"
                    label="Password:"
                    label-for="password"
                    >
                    <BFormInput
                        id="password"
                        v-model="form.password"
                        type="password"
                        placeholder="Enter password"
                    />
                </BFormGroup>
                <BButton type="submit" variant="primary">Connexion</BButton>
            </BForm>
        </BCard>
    </BContainer>
</template>
<script setup lang="ts">

    //props
    const props = defineProps({
        form: {
            type: Object,
            default: undefined
        },
    })

    // emits declaration
    const emit = defineEmits(['submit'])

</script>