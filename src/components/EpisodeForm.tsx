import { Button } from "./ui/button"
import { Input } from "./ui/input"

interface EpisodeFormProps {
  editingEpisode: boolean
  episodeNumberInput: string
  episodeTitleInput: string
  episodeSeasonInput: string
  onEpisodeNumberChange: (value: string) => void
  onEpisodeTitleChange: (value: string) => void
  onEpisodeSeasonChange: (value: string) => void
  onSubmit: () => void
  onCancel: () => void
}

export function EpisodeForm({
  editingEpisode,
  episodeNumberInput,
  episodeTitleInput,
  episodeSeasonInput,
  onEpisodeNumberChange,
  onEpisodeTitleChange,
  onEpisodeSeasonChange,
  onSubmit,
  onCancel,
}: EpisodeFormProps) {
  return (
    <div className="mt-6 rounded-xl border border-slate-800 bg-slate-900 p-6">
      <h3 className="mb-5 text-xl font-bold">
        {editingEpisode
          ? "Edit Episode"
          : "Add Episode"}
      </h3>

      <div className="grid gap-4 md:grid-cols-3">
        <Input
          type="number"
          placeholder="Episode number"
          value={episodeNumberInput}
          onChange={(event) =>
            onEpisodeNumberChange(event.target.value)
          }
        />

        <Input
          type="text"
          placeholder="Episode title"
          value={episodeTitleInput}
          onChange={(event) =>
            onEpisodeTitleChange(event.target.value)
          }
        />

        <Input
          type="number"
          placeholder="Season"
          value={episodeSeasonInput}
          onChange={(event) =>
            onEpisodeSeasonChange(event.target.value)
          }
        />
      </div>

      <div className="mt-5 flex gap-3">
        <Button
          type="button"
          onClick={onSubmit}
        >
          {editingEpisode
            ? "Save Changes"
            : "Add Episode"}
        </Button>

        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
        >
          Cancel
        </Button>
      </div>
    </div>
  )
}