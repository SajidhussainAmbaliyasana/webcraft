import useSnackbar from '../hooks/useSnackbar' 
 
const Epage = () => {

    const snackbar = useSnackbar();
  return (
    <>
    <p>this is p </p>
    <button onClick={() => snackbar.success("Working perfectly!")}>
      Test Snackbar
    </button>
    </>
  )
}

export default Epage
