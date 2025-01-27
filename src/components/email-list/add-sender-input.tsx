import { CirclePlus } from "lucide-react";
import { Input } from "../ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch } from "react";

const addSenderSchema = z.object({
  email: z.string().email(),
});

type AddSenderSchema = z.infer<typeof addSenderSchema>;

interface AddSenderInputProps {
  setSenders: Dispatch<React.SetStateAction<string[]>>;
}

export function AddSenderInput({ setSenders: addEmailInList }: AddSenderInputProps) {
  const {
    register,
    handleSubmit,
    // formState: { isSubmitting },
  } = useForm<AddSenderSchema>({
    resolver: zodResolver(addSenderSchema),
  });

  function handleAddEmailInSenderList({ email }: AddSenderSchema) {
    try {
      addEmailInList((prev) => [email, ...prev]);
    } catch (error: any) {
      console.error("Error adding email to the list:", error);
    }
  }

  return (
    <form
      onSubmit={() => {
        handleSubmit(handleAddEmailInSenderList)
      }}
      className="flex gap-6"
    >
      <div className="flex gap-6">
        <Input
          id="email"
          type="email"
          autoCorrect="off"
          autoComplete="email"
          autoCapitalize="none"
          className="w-80"
          {...register("email")}
        />
        <button type="submit">
          <CirclePlus />
        </button>
      </div>
    </form>
  );
}
