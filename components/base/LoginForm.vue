<template>
    <BContainer>
        <BCard>
            <BForm @submit="onSubmit">
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
                        autocomplete="false"
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
                        autocomplete="false"
                    />
                </BFormGroup>
                <BButton class="m-1" type="submit" variant="primary">Connexion</BButton>
                <BButton class="m-1" type="button" variant="primary" @click="resetPassword()">Reset Password</BButton>
            </BForm>
        </BCard>
    </BContainer>
</template>
<script setup lang="ts">

    //local ref
    const form = ref({
        email: null,
        password: null,
    })

    // emits declaration
    const emit = defineEmits(['submit', 'resetPassword'])

    const onSubmit = (event:Event) => {
        event.preventDefault()
        if(form.value.email && form.value.password) {
            signInUser(form.value.email, form.value.password)
        }
    }

    // const methods
    const resetPassword = () => {
        if(form.value.email) sendPasswordReset(form.value.email)
    }

</script>