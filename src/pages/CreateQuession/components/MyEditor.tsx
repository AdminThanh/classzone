import { Editor } from '@tinymce/tinymce-react';
import { useRef } from 'react';

interface IMyEditor {
  question: string;
  onChange?: (value: any) => void;
}

const MyEditor: React.FC<IMyEditor> = (props: any) => {
  const { onChange, question } = props;
  const editorRef = useRef(null);

  const handleChange = (value: string) => {
    onChange(value);
  };

  return (
    <Editor
      onEditorChange={handleChange}
      apiKey="7ad8eq7icu3n630t4u3ioq10q46dh4k70mpveov40xv5ofo9"
      onInit={(evt: any, editor: any) => (editorRef.current = editor)}
      initialValue={question}
      init={{
        height: 200,
        // plugins: [
        //   'print preview powerpaste casechange importcss tinydrive searchreplace autolink autosave save directionality advcode visualblocks visualchars fullscreen image link media mediaembed template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists checklist wordcount tinymcespellchecker a11ychecker imagetools textpattern noneditable help formatpainter permanentpen pageembed charmap tinycomments mentions quickbars linkchecker emoticons advtable export',
        // ],
        content_style:
          'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
        menubar: false,
        toolbar:
          'undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist checklist | forecolor backcolor casechange permanentpen formatpainter removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media pageembed template link anchor codesample | a11ycheck ltr rtl | showcomments addcomment',
        autosave_ask_before_unload: true,
        autosave_interval: '30s',
      }}
    />
  );
};

export default MyEditor;
