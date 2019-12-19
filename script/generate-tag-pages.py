import os
from slugify import slugify

output_path = "tags"
template_filename = "_templates/tag.md"

def collect(input_path):
    ret = set()
    for filename in os.listdir(input_path):
        if filename.endswith(".md") or filename.endswith(".markdown"):
            f = open(input_path + '/' + filename, "r", encoding='UTF-8')
            enter_front = False
            line = f.readline()
            while line:
                strip_line = line.strip()
                if strip_line == '---':
                    if enter_front:
                        break
                    else:
                        enter_front = True
                if enter_front and strip_line.startswith('tags:'):
                    tags = strip_line[len('tags:'):].strip().lstrip('[').rstrip(']').strip().split(',')
                    for tag in tags:
                        ret.add(tag.strip())
                    break
                line = f.readline()
            f.close()
    return ret

tags = collect('_posts')
if os.path.isdir('_drafts'):
    tags = tags.union(collect('_drafts'))
print('Collected tags: ' + str(tags))

if os.path.isdir(output_path):
    for filename in os.listdir(output_path):
        file_path = os.path.join(output_path, filename)
        try:
            if os.path.isfile(file_path) or os.path.islink(file_path):
                os.unlink(file_path)
        except Exception as e:
            print('Failed to delete %s. Reason: %s' % (file_path, e))
else:
    os.mkdir(output_path)

template = open(template_filename, 'r', encoding='UTF-8')
template_data = template.read()
for tag in tags:
    f = open(output_path + '/' + slugify(tag) + '.md', 'w', encoding='UTF-8')
    data = template_data.replace('__tag__', tag)
    f.write(data)
    f.close()
template.close()