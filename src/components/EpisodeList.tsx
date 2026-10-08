import { Button } from "./ui/button"

interface Episode {
  id: number
  seriesId: number
  season: number
  episodeNumber: number
  title: string
  watched: boolean
}

interface EpisodeListProps {
  episodes: Episode[]
  onToggleWatched: (id: number) => void
  onEdit: (episode: Episode) => void
  onDelete: (id: number) => void
}

export function EpisodeList({
  episodes,
  onToggleWatched,
  onEdit,
  onDelete,
}: EpisodeListProps) {
  if (episodes.length === 0) {
    return (
      <p className="mt-6 text-center text-slate-400">
        No episodes found for this season.
      </p>
    )
  }

  return (
    <div className="mt-6 space-y-3">
      {episodes.map((episode) => (
        <div
          key={episode.id}
          className="flex flex-col gap-4 rounded-xl border border-slate-800 bg-slate-900 p-4 md:flex-row md:items-center md:justify-between"
        >
          <div>
            <p className="font-semibold text-white">
              Episode {episode.episodeNumber}
            </p>

            <p className="text-sm text-slate-400">
              {episode.title}
            </p>

            <p className="mt-1 text-xs text-slate-500">
              Season {episode.season}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              onClick={() =>
                onToggleWatched(episode.id)
              }
            >
              {episode.watched
                ? "✓ Watched"
                : "Mark as Watched"}
            </Button>

            <Button
              variant="outline"
              onClick={() => onEdit(episode)}
            >
              Edit
            </Button>

            <Button
              variant="destructive"
              onClick={() => onDelete(episode.id)}
            >
              Delete
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}   