import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { appRoutes } from "@/lib/navigation";
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
      <Route path={appRoutes.dashboard} component={Home} />
      <Route path={appRoutes.timeClock} component={TimeClock} />
      <Route path={appRoutes.history} component={History} />
      <Route path={appRoutes.projects} component={Projects} />
      <Route path={appRoutes.reports} component={Reports} />
      <Route path={appRoutes.settings} component={Settings} />
      <Route path={appRoutes.account} component={Account} />
      <Route path={appRoutes.notFound} component={NotFound} />
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
