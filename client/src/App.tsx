import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import Account from "@/pages/Account";
import History from "@/pages/History";
import NotFound from "@/pages/NotFound";
import Projects from "@/pages/Projects";
import Reports from "@/pages/Reports";
import Settings from "@/pages/Settings";
import TimeClock from "@/pages/TimeClock";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";

function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/ponto"} component={TimeClock} />
      <Route path={"/historico"} component={History} />
      <Route path={"/projetos"} component={Projects} />
      <Route path={"/relatorios"} component={Reports} />
      <Route path={"/configuracoes"} component={Settings} />
      <Route path={"/minha-conta"} component={Account} />
      <Route path={"/404"} component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
