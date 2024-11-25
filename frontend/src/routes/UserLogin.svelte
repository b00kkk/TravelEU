<script>
    import { push } from 'svelte-spa-router'
    import fastapi from "../lib/api"
    import Error from "../components/Error.svelte"  
    import { access_token, id, is_login } from "../lib/store"
    import { tick } from 'svelte'

    let error = {detail:[]}
    let login_id = ""
    let login_password = ""

    async function login(event) {
        event.preventDefault();
        let url = "/api/user/login"
        let params = {
            username: login_id,
            password: login_password,
        }
        
        const json = await fastapi('login', url, params);
       
        if (json)  {
                console.log('로그인성공')
                $access_token = json.access_token
                $id = json.id
                $is_login = true
                push("/")
        }else {
                error = json_error
            }
    }
</script>

<div class="container">
    <h5 class="my-3 border-bottom pb-2">로그인</h5>
    <Error error={error} />
    <form method="post">
        <div class="mb-3">
            <label for="id">사용자 이름</label>
            <input type="text" class="form-control" id="id" bind:value="{login_id}">
        </div>
        <div class="mb-3">
            <label for="password">비밀번호</label>
            <input type="password" class="form-control" id="password" bind:value="{login_password}">
        </div>
        <button type="submit" class="btn btn-primary" on:click="{login}">로그인</button>
    </form>
</div>