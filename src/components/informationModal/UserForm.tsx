import useInformationModal from "@/hooks/useInformationModal";
import { Button } from "../ui/button";
import { DialogHeader, DialogTitle, DialogFooter } from "../ui/dialog";
import { Input } from "../ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
} from "../ui/select";
import SlideLeft from "../animations/slide-left";
function UserForm() {
  const { setFormType } = useInformationModal();

  return (
    <SlideLeft>
      <DialogHeader>
        <DialogTitle className="mb-5 text-3xl capitalize">
          {"Hi gamers, Tell us more about yourself"}
        </DialogTitle>
      </DialogHeader>
      <div className="gap-y-2 flex flex-col items-start !mb-4">
        <label className="font-bold">Username</label>
        <Input
          className=" bg-background"
          type="text"
          placeholder="Your username"
        />
      </div>
      <div className="gap-y-2 flex flex-col items-start !mb-4">
        <label className="font-bold">Bio</label>
        <Input
          className="bg-background "
          type="email"
          placeholder="Please write some words about yourself"
        />
      </div>
      <div className="gap-y-2 flex flex-col items-start !mb-4">
        <label className="font-bold">Location</label>
        <Select>
          <SelectTrigger className=" w-full">
            <SelectValue className="" placeholder="Where is your server" />
          </SelectTrigger>
          <SelectContent className="bg-background">
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

      <DialogFooter className="mt-6">
        <Button
          type="submit"
          onClick={() => {
            setFormType("information-form");
          }}
        >
          Save change
        </Button>
      </DialogFooter>
    </SlideLeft>
  );
}

export default UserForm;
