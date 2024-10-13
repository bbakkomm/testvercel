const corsOption = {
  origin: [
    "https://port-0-testvercel-m26geil7668e23ca.sel4.cloudtype.app",
    "https://web-testvercels-m26geil7668e23ca.sel4.cloudtype.app",
    "http://localhost:5100",
    "http://localhost:5173",
  ],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
  optionsSuccessStatus: 204,
  credentials: true,
}

export default corsOption;