import { AldiButton } from '@/components/nextui/aldi-button';

export default function Page() {
  return (
    <div className="container mx-auto flex h-full w-full flex-col items-center justify-center gap-8 px-4 py-14 md:px-0">
      <h1 className="text-3xl font-bold text-secondary md:hidden xl:block">
        Dein Konto löschen
      </h1>
      <h1 className="hidden text-3xl font-bold text-secondary md:block xl:hidden">
        Konto löschen
      </h1>
      <p className="hidden text-center text-[22px] text-secondary opacity-75 md:block xl:hidden">
        Deine Daten und dein Konto werden zur unwiderruflichen Löschung
        vorgemerkt. Wenn der Prozess abgeschlossen ist, musst du ein neues Konto
        erstellen, um deine Kontovorteile wieder nutzen zu können. Sofern du ein
        ALDI SPORTS Konto besitzt, wird dieses ebenfalls gelöscht. Wenn der
        Prozess abgeschlossen ist musst du ein neues Konto erstellen, um die
        ALDI SPORTS App wieder nutzen zu können.
      </p>
      <p className="text-center text-[22px] text-secondary opacity-75 md:hidden xl:block xl:w-[1060px]">
        Deine Daten und dein Konto werden zur unwiderruflichen Löschung
        vorgemerkt. Wenn der Prozess abgeschlossen ist, musst du ein neues Konto
        bei ALDI DEALS oder ALDI SPORTS erstellen, um deine Kontovorteile bei
        ALDI DEALS wieder nutzen zu können.
      </p>
      <p className="text-center text-[22px] text-secondary opacity-75 md:hidden xl:block xl:w-[1060px]">
        Sofern du ebenfalls den ALDI SPORTS Dienst nutzt, werden deine dortigen
        Daten ebenfalls gelöscht. Wenn der Prozess abgeschlossen ist, musst du
        ein neues Konto bei ALDI DEALS oder ALDI SPORTS erstellen, um die ALDI
        SPORTS App wieder nutzen zu können. Deine ALDI SPORTS Mitgliedschaft
        (Prepaid oder Abonnement) wird hiervon keineswegs beeinflusst– sie
        bleibt bestehen für die gebuchte Dauer des damaligen Kaufs.
      </p>
      <p className="text-center text-[22px] text-secondary opacity-75 md:hidden xl:block xl:w-[1060px]">
        Deine Daten von Bestellungen bei ALDI DEALS sowie deine Daten des Kaufes
        von ALDI SPORTS Mitgliedschaften werden nach Ablauf nach der
        Kontolöschung für die Dauer von steuer- und handelsrechtlichen
        Aufbewahrungspflicht aufbewahrt.
      </p>
      <div className="flex flex-col items-center justify-center gap-2">
        <h1 className="text-lg font-bold text-aldi-key">
          Wichtiger Hinweis zu gekauften DEALS:
        </h1>
        <p className="text-center text-aldi-key opacity-75 xl:w-[920px]">
          Deine gekauften DEALS behalten dabei natürlich ihre Gültigkeit
          entsprechend der Bedingungen, die beim Kauf geltend waren. Die
          Kontolöschung hat keine Auswirkung auf diese Deal-Bedingungen.
        </p>
      </div>
      <div className="flex w-full flex-col items-center justify-center gap-6 md:flex-row">
        <AldiButton
          variant="warning"
          color="warning"
          className="w-full px-8 md:w-auto"
        >
          Abbrechen
        </AldiButton>
        <AldiButton
          variant="warning"
          color="warning"
          className="w-full px-8 md:w-auto"
        >
          Ja, Konto löschen{' '}
        </AldiButton>
      </div>
    </div>
  );
}
