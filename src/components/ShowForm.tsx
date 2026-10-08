import { Button } from "./ui/button"
import { Input } from "./ui/input"

interface ShowFormProps {
  editingShow: boolean
  titleInput: string
  typeInput: "Movie" | "TV Series"
  genreInput: string
  yearInput: string
  onTitleChange: (value: string) => void
  onTypeChange: (value: "Movie" | "TV Series") => void
  onGenreChange: (value: string) => void
  onYearChange: (value: string) => void
  onPosterUpload: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void
  onSubmit: () => void
  onCancel: () => void
}

export function ShowForm({
  editingShow,
  titleInput,
  typeInput,
  genreInput,
  yearInput,
  onTitleChange,
  onTypeChange,
  onGenreChange,
  onYearChange,
  onPosterUpload,
  onSubmit,
  onCancel,
}: ShowFormProps) {
  return (
    <div className="mb-8 rounded-xl border border-slate-800 bg-slate-900 p-6">
      <h2 className="mb-6 text-2xl font-bold">
        {editingShow ? "Edit Show" : "Add New Show"}
      </h2>

      <div className="grid gap-4 md:grid-cols-2">
        <Input
          type="text"
          placeholder="Title"
          value={titleInput}
          className="bg-slate-900 text-white placeholder:text-slate-400"
          onChange={(event) =>
            onTitleChange(event.target.value)
          }
        />

        <select
          value={typeInput}
          onChange={(event) =>
            onTypeChange(
              event.target.value as "Movie" | "TV Series"
            )
          }
          className="rounded-lg border border-slate-700 bg-slate-900 px-4 py-2 text-white"
        >
          <option value="Movie">Movie</option>
          <option value="TV Series">TV Series</option>
        </select>

        <Input
          type="text"
          placeholder="Genre"
          value={genreInput}
          className="bg-slate-900 text-white placeholder:text-slate-400"
          onChange={(event) =>
            onGenreChange(event.target.value)
          }
        />

        <Input
          type="number"
          placeholder="Year"
          value={yearInput}
           className="bg-slate-900 text-white placeholder:text-slate-400"
          onChange={(event) =>
            onYearChange(event.target.value)
          }
        />

        <div className="md:col-span-2">
          <label className="mb-2 block text-sm text-slate-300">
            Poster
          </label>

          <input
            type="file"
            accept="image/*"
            onChange={onPosterUpload}
            className="block w-full rounded-lg border border-slate-700 bg-slate-800 p-2 text-sm text-slate-300"
          />
        </div>
      </div>

      <div className="mt-6 flex gap-3">
        <Button type="button" onClick={onSubmit}>
          {editingShow ? "Save Changes" : "Save Show"}
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