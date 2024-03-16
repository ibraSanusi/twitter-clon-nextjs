export default function Page() {
  return (
    <>
      <h1 className="text-2xl">Login</h1>
      <form action="login">
        <input name="username" type="text" />
        <input name="password" type="text" />
      </form>
    </>
  )
}
