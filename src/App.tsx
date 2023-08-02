import { TextField, Button, Stack, Container } from "@mui/material";

function App() {
  return (
    <div>
      <Container>
        <Stack spacing={1}>
          <Button variant="text">Text</Button>
          <Button variant="contained">Contained</Button>
          <Button variant="outlined">Outlined</Button>
          <TextField id="outlined-basic" label="Outlined" variant="outlined" />
        </Stack>
      </Container>
    </div>
  );
}

export default App;
