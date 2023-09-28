import { Button } from "../ui/button";
import { DialogHeader, DialogTitle, DialogFooter } from "../ui/dialog";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
} from "../ui/select";
import SlideLeft from "../animations/slide-left";
export default function GamingForm() {
  return (
    <SlideLeft>
      <DialogHeader>
        <DialogTitle className="capitalize">
          <h1 className="mb-5 text-3xl">
            {"Let's us know more about your gaming hobbies"}
          </h1>
        </DialogTitle>
      </DialogHeader>
      <div className="gap-y-2 flex flex-col items-start mb-2">
        <label className="font-bold">Location</label>
        <Select>
          <SelectTrigger className=" w-full">
            <SelectValue className="" placeholder="Where is your server" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem className="bg-background hover:bg-muted" value="SEA">
                SEA (South East Asia)
              </SelectItem>
              <SelectItem className="bg-background hover:bg-muted" value="VN">
                VN (Vietnam)
              </SelectItem>
              <SelectItem className="bg-background hover:bg-muted" value="NA">
                NA (North America)
              </SelectItem>
              <SelectItem className="bg-background hover:bg-muted" value="EU">
                EU (Europian)
              </SelectItem>
              <SelectItem className="bg-background hover:bg-muted" value="OCE">
                OCE (Oceania)
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <DialogFooter className="mt-4">
        <Button type="submit" onClick={() => {}}>
          Save change
        </Button>
      </DialogFooter>
    </SlideLeft>
  );
}
