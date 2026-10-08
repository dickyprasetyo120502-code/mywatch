import { Button } from "./ui/button"
import { Card, CardContent } from "./ui/card"

interface Show {
  id: number
  title: string
  type: "Movie" | "TV Series"
  genre: string
  year: number
  poster: string
}

interface ShowCardProps {
  show: Show
  onViewDetails: (show: Show) => void
}

export function ShowCard({
  show,
  onViewDetails,
}: ShowCardProps) {
  return (
    <Card className="overflow-hidden border-slate-800 bg-slate-900">
      <div className="h-72 bg-slate-800">
        <img
          src={show.poster}
          alt={show.title}
          className="h-full w-full object-contain"
        />
      </div>

      <CardContent className="p-5">
        <div className="mb-2 flex items-start justify-between gap-3">
          <h3 className="text-xl font-semibold !text-white">
            {show.title}
          </h3>

          <span className="rounded-full bg-purple-600 px-3 py-1 text-xs font-medium">
            {show.type}
          </span>
        </div>

        <p className="text-sm text-slate-400">
          {show.genre} • {show.year}
        </p>

        <Button
          variant="outline"
          onClick={() => onViewDetails(show)}
          className="mt-5 w-full !border-slate-600 !bg-slate-900 !text-white hover:!bg-slate-800 hover:!text-white"
        >
          View Details
        </Button>
      </CardContent>
    </Card>
  )
}