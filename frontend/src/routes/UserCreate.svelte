<script>
    import { push } from 'svelte-spa-router'
    import fastapi from "../lib/api"
    import Error from "../components/Error.svelte"

    let error = { detail: [] } 
    let id = ''
    let password1 = ''
    let password2 = ''
    let gender = ''
    let age = ''
    

    async function post_user(event) {
        event.preventDefault();
        let url = "/api/user/create"
        let params = {
            id: id,
            password1: password1,
            password2: password2,
            gender: parseInt(gender),
            age: parseInt(age)
        };
        const json = await fastapi('post', url, params);
        
        if (json) {
                console.log('성공')
                push('/user-login')
            }
        else{
                console.log('실패')
                error = json_error
            }
        
    }
</script>

<div class="container">
    <h5 class="my-3 border-bottom pb-2">회원 가입</h5>
    <Error error={error} />
    <form method="post">
        <div class="mb-3">
            <label for="id">사용자 아이디</label>
            <input type="text" class="form-control" id="id" bind:value="{id}">
        </div>
        <div class="mb-3">
            <label for="password1">비밀번호</label>
            <input type="password" class="form-control" id="password1" bind:value="{password1}">
        </div>
        <div class="mb-3">
            <label for="password2">비밀번호 확인</label>
            <input type="password" class="form-control" id="password2" bind:value="{password2}">
        </div>
        <div class="mb-3">
            <label for="gender">성별</label>
            <input type="text" class="form-control" id="gender" bind:value="{gender}">
        </div>
        <div class="mb-3">
            <label for="age">나이</label>
            <input type="text" class="form-control" id="age" bind:value="{age}">
        </div>
        <button type="submit" class="btn btn-primary" on:click="{post_user}">생성하기</button>
    </form>
</div>